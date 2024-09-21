from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Workout, WorkoutPlan, WorkoutExercise
from exercises.models import Exercise
from datetime import date, timedelta

User = get_user_model()

class WorkoutViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)

        self.exercise = Exercise.objects.create(name='Push-up', description='Basic push-up')
        self.workout_plan = WorkoutPlan.objects.create(user=self.user, name='Test Plan')
        self.workout = Workout.objects.create(user=self.user, plan=self.workout_plan, date=date.today())
        self.workout_exercise = WorkoutExercise.objects.create(
            workout=self.workout,
            exercise=self.exercise,
            sets=3,
            reps=10,
            weight=0
        )

    def test_create_workout(self):
        data = {
            'plan': self.workout_plan.id,
            'date': date.today(),
            'notes': 'Test workout',
            'exercises': [
                {
                    'exercise_id': self.exercise.id,
                    'sets': 3,
                    'reps': 12,
                    'weight': 0
                }
            ]
        }
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Workout.objects.count(), 2)

    def test_list_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_workout_report(self):
        response = self.client.get('/api/workouts/report/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_workouts', response.data)
        self.assertIn('total_exercises', response.data)
        self.assertIn('avg_exercises_per_workout', response.data)
        self.assertIn('exercise_stats', response.data)

    def test_active_workouts(self):
        # Create a future workout
        future_workout = Workout.objects.create(user=self.user, plan=self.workout_plan, date=date.today() + timedelta(days=1))
        
        response = self.client.get('/api/workouts/active/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Including the workout created in setUp

    def test_update_workout(self):
        data = {
            'plan': self.workout_plan.id,
            'date': date.today(),
            'notes': 'Updated workout',
            'exercises': [
                {
                    'exercise_id': self.exercise.id,
                    'sets': 4,
                    'reps': 15,
                    'weight': 10
                }
            ]
        }
        response = self.client.put(f'/api/workouts/{self.workout.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.workout.refresh_from_db()
        self.assertEqual(self.workout.notes, 'Updated workout')
        self.assertEqual(self.workout.exercises.first().sets, 4)

    def test_delete_workout(self):
        response = self.client.delete(f'/api/workouts/{self.workout.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Workout.objects.count(), 0)