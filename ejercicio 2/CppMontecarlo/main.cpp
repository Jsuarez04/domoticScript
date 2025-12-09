#include <iostream>
#include <random>
#include <chrono>


const long long ITERATIONS = 1000000;

double calculate_pi_cpp() {
   
    
  
    unsigned seed = std::chrono::high_resolution_clock::now().time_since_epoch().count();
    std::mt19937 generator(seed);
    
  
    std::uniform_real_distribution<double> distribution(0.0, 1.0);
    
    long long circle_count = 0;

  
    for (long long i = 0; i < ITERATIONS; ++i) {
    
        double x = distribution(generator);
        double y = distribution(generator);
        
        if (x * x + y * y <= 1.0) {
            circle_count++;
        }
    }
    

    return 4.0 * circle_count / ITERATIONS;
}

int main() {
    auto start = std::chrono::high_resolution_clock::now();
    double pi_estimate = calculate_pi_cpp();
    auto end = std::chrono::high_resolution_clock::now();


    std::chrono::duration<double> duration = end - start;

    std::cout << "Estimacion de Pi: " << pi_estimate << std::endl;
    std::cout << "Iteraciones: " << ITERATIONS << std::endl;
    std::cout << "Tiempo de Ejecucion: " << duration.count() << " segundos" << std::endl;

    return 0;
}