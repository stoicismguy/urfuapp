from django.urls import path
from .views import MainPage, quiz_view, quiz_data_view, save_quiz_view, create_quiz_view, save_create_view

urlpatterns = [
    path('', MainPage.as_view()),
    path('<pk>/', quiz_view),
    path('create', create_quiz_view),
    path('create/save/', save_create_view),
    path('<pk>/data/', quiz_data_view),
    path('<pk>/save/', save_quiz_view)
]