import pandas as pd
import numpy as np
import json
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

class AIModelEvaluator:
    def __init__(self, model_name):
        self.model_name = model_name
        self.metrics = {}
        self.feedback_data = None
        self.performance_data = None
    
    def load_user_feedback(self, feedback_file):
        """Load user feedback data from JSON file"""
        try:
            with open(feedback_file, 'r') as f:
                self.feedback_data = json.load(f)
            print(f"Loaded feedback data: {len(self.feedback_data)} entries")
            return True
        except Exception as e:
            print(f"Error loading feedback data: {e}")
            return False
    
    def load_performance_data(self, performance_file):
        """Load model performance data from CSV file"""
        try:
            self.performance_data = pd.read_csv(performance_file)
            print(f"Loaded performance data: {len(self.performance_data)} records")
            return True
        except Exception as e:
            print(f"Error loading performance data: {e}")
            return False
    
    def calculate_metrics(self):
        """Calculate key performance metrics for the AI model"""
        if self.performance_data is None:
            print("No performance data loaded")
            return
        
        # Example metrics calculation (customize based on your actual data structure)
        if 'predicted' in self.performance_data.columns and 'actual' in self.performance_data.columns:
            y_true = self.performance_data['actual']
            y_pred = self.performance_data['predicted']
            
            self.metrics['accuracy'] = accuracy_score(y_true, y_pred)
            self.metrics['precision'] = precision_score(y_true, y_pred, average='weighted')
            self.metrics['recall'] = recall_score(y_true, y_pred, average='weighted')
            self.metrics['f1'] = f1_score(y_true, y_pred, average='weighted')
            
        if 'response_time' in self.performance_data.columns:
            self.metrics['avg_response_time'] = self.performance_data['response_time'].mean()
            self.metrics['max_response_time'] = self.performance_data['response_time'].max()
    
    def analyze_feedback(self):
        """Analyze user feedback for insights"""
        if self.feedback_data is None:
            print("No feedback data loaded")
            return
        
        # Example feedback analysis (customize based on your actual data structure)
        if isinstance(self.feedback_data, list):
            ratings = [item.get('rating', 0) for item in self.feedback_data if 'rating' in item]
            if ratings:
                self.metrics['avg_user_rating'] = sum(ratings) / len(ratings)
                self.metrics['user_satisfaction'] = len([r for r in ratings if r >= 4]) / len(ratings)
    
    def generate_recommendations(self):
        """Generate recommendations for model improvements based on analysis"""
        recommendations = []
        
        if not self.metrics:
            return ["No data available for generating recommendations"]
        
        # Example recommendation logic (customize based on your actual metrics)
        if 'accuracy' in self.metrics and self.metrics['accuracy'] < 0.8:
            recommendations.append("Improve model accuracy through additional training data")
        
        if 'avg_response_time' in self.metrics and self.metrics['avg_response_time'] > 1.0:
            recommendations.append("Optimize model for faster response times")
        
        if 'user_satisfaction' in self.metrics and self.metrics['user_satisfaction'] < 0.7:
            recommendations.append("Address user feedback to improve satisfaction ratings")
        
        return recommendations
    
    def generate_report(self, output_file="model_evaluation_report.json"):
        """Generate a comprehensive evaluation report"""
        self.calculate_metrics()
        self.analyze_feedback()
        
        report = {
            "model_name": self.model_name,
            "metrics": self.metrics,
            "recommendations": self.generate_recommendations(),
            "timestamp": pd.Timestamp.now().isoformat()
        }
        
        with open(output_file, 'w') as f:
            json.dump(report, f, indent=2)
        
        print(f"Report generated: {output_file}")
        return report

if __name__ == "__main__":
    evaluator = AIModelEvaluator("website-assistant-model")
    
    # Replace with actual data file paths
    evaluator.load_performance_data("model_performance.csv")
    evaluator.load_user_feedback("user_feedback.json")
    
    report = evaluator.generate_report()
    
    print("\nKey Metrics:")
    for metric, value in report["metrics"].items():
        print(f"- {metric}: {value:.4f}" if isinstance(value, float) else f"- {metric}: {value}")
    
    print("\nRecommendations:")
    for rec in report["recommendations"]:
        print(f"- {rec}")
