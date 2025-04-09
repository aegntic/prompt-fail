import requests
import time
import json
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By

# Configure logging
logging.basicConfig(filename='test_results.log', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

class WebsiteTester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.results = {
            "functional": [],
            "performance": [],
            "security": []
        }
    
    def functional_test(self):
        """Test core website functionality"""
        logging.info("Starting functional tests")
        
        # Example: Test homepage loading
        start_time = time.time()
        response = self.session.get(f"{self.base_url}")
        load_time = time.time() - start_time
        
        result = {
            "test": "homepage_load",
            "status": response.status_code,
            "time": load_time,
            "passed": response.status_code == 200
        }
        
        self.results["functional"].append(result)
        logging.info(f"Homepage test: {result['passed']}")
        
        # Add more functional tests here
    
    def security_test(self):
        """Test website security measures"""
        logging.info("Starting security tests")
        
        # Example: Test for basic security headers
        response = self.session.get(f"{self.base_url}")
        headers = response.headers
        
        has_xss_protection = "X-XSS-Protection" in headers
        has_content_security = "Content-Security-Policy" in headers
        
        result = {
            "test": "security_headers",
            "passed": has_xss_protection and has_content_security,
            "details": {
                "has_xss_protection": has_xss_protection,
                "has_content_security": has_content_security
            }
        }
        
        self.results["security"].append(result)
        logging.info(f"Security headers test: {result['passed']}")
    
    def performance_test(self, iterations=10):
        """Test website performance metrics"""
        logging.info("Starting performance tests")
        
        load_times = []
        for i in range(iterations):
            start_time = time.time()
            response = self.session.get(f"{self.base_url}")
            load_times.append(time.time() - start_time)
            time.sleep(1)  # Avoid hammering the server
        
        avg_load_time = sum(load_times) / len(load_times)
        
        result = {
            "test": "load_performance",
            "avg_time": avg_load_time,
            "passed": avg_load_time < 2.0  # Pass if under 2 seconds
        }
        
        self.results["performance"].append(result)
        logging.info(f"Performance test: {result['passed']} (avg: {avg_load_time:.2f}s)")
    
    def run_all_tests(self):
        """Execute all test categories"""
        self.functional_test()
        self.security_test()
        self.performance_test()
        
        # Export results to JSON
        with open('test_results.json', 'w') as f:
            json.dump(self.results, f, indent=2)
        
        return self.results

if __name__ == "__main__":
    # Replace with actual website URL
    tester = WebsiteTester("https://example.com")
    results = tester.run_all_tests()
    
    # Print summary
    print("Testing complete!")
    total_tests = sum(len(category) for category in results.values())
    passed_tests = sum(
        sum(1 for test in category if test.get("passed", False))
        for category in results.values()
    )
    print(f"Passed: {passed_tests}/{total_tests} tests")
