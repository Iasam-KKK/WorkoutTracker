from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutViewSet, WorkoutPlanViewSet 

router = DefaultRouter()
router.register(r'workouts', WorkoutViewSet, basename='workout')
router.register(r'workout-plans', WorkoutPlanViewSet, basename='workout-plan')

urlpatterns = [
    path('', include(router.urls)),
]