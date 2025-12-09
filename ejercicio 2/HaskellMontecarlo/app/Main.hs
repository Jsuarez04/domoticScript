import System.Random
import System.CPUTime
import Control.Monad (replicateM)


iterations :: Double
iterations = 1000000.0


randomPoint :: IO (Double, Double)
randomPoint = do
    x <- randomRIO (0.0, 1.0) :: IO Double
    y <- randomRIO (0.0, 1.0) :: IO Double
    return (x, y)


isInsideCircle :: (Double, Double) -> Bool
isInsideCircle (x, y) = x*x + y*y <= 1.0


calculatePiHaskell :: IO Double
calculatePiHaskell = do
 
    points <- replicateM (floor iterations) randomPoint

  
    let circleCount = fromIntegral $ length $ filter isInsideCircle points


    return $ 4.0 * circleCount / iterations

main :: IO ()
main = do
    start <- getCPUTime
    piEstimate <- calculatePiHaskell
    end <- getCPUTime
    

    let diff = fromIntegral (end - start) / (10^12) :: Double 

    putStrLn $ "Estimación de Pi (Haskell): " ++ show piEstimate
    putStrLn $ "Iteraciones: " ++ show (floor iterations)
    putStrLn $ "Tiempo de Ejecución: " ++ show diff ++ " segundos"