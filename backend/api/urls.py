from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, TeamViewSet, RegisterView, MeView

router = DefaultRouter()
router.register(r'tickets', TicketViewSet)
router.register(r'teams', TeamViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view()),
    path('me/', MeView.as_view()),
]