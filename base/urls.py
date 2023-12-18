from django.urls import path
from .views import MainPage, quiz_view, quiz_data_view, save_quiz_view, create_quiz_view, save_create_view, quiz_preview, delete_quiz, statistic_quiz, get_quiz_statistic

urlpatterns = [
    path('', MainPage.as_view()),
    path('<pk>/solve', quiz_view),
    path('<pk>/preview', quiz_preview),
    path('<pk>/statistic', statistic_quiz),
    path('<pk>/statistic/data/', get_quiz_statistic),
    path('<pk>/delete', delete_quiz),
    path('create', create_quiz_view),
    path('create/save/', save_create_view),
    path('<pk>/data/', quiz_data_view),
    path('<pk>/save/', save_quiz_view)
]