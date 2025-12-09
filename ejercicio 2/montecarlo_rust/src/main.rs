use rand::Rng;
use std::time::Instant;


const ITERATIONS: u64 = 1_000_000;

fn calculate_pi_rust() -> f64 {
    
    let mut rng = rand::thread_rng();
    let mut circle_count: u64 = 0;

    
    for _ in 0..ITERATIONS {
  
        let x: f64 = rng.gen_range(0.0..1.0); 
        let y: f64 = rng.gen_range(0.0..1.0);
        
       
        if x * x + y * y <= 1.0 {
            circle_count += 1;
        }
    }

    4.0 * (circle_count as f64) / (ITERATIONS as f64)
}

fn main() {
    let start = Instant::now();
    let pi_estimate = calculate_pi_rust();
    let duration = start.elapsed();

    println!("Estimación de Pi (Rust): {}", pi_estimate);
    println!("Iteraciones: {}", ITERATIONS);
    println!("Tiempo de Ejecución: {} segundos", duration.as_secs_f64());
}