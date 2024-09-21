from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from workouts.models import Workout, WorkoutPlan, WorkoutExercise
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

    # ... (rest of the test methods remain the same)