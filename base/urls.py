from django.urls import path
from .views import MainPage, quiz_view, quiz_data_view, save_quiz_view,\
    create_quiz_view, save_create_view, quiz_preview, delete_quiz, statistic_quiz,\
    get_quiz_statistic, search_view, profile_view

urlpatterns = [
    path('', MainPage.as_view(), name='main'),
    path('<pk>/solve', quiz_view, name='solve'),
    path('<pk>/preview', quiz_preview, name='preview'),
    path('<pk>/statistic', statistic_quiz, name="statistic"),
    path('<pk>/statistic/data/', get_quiz_statistic),
    path('<pk>/delete', delete_quiz, name='delete'),
    path('create', create_quiz_view, name='create'),
    path('create/save/', save_create_view),
    path('<pk>/data/', quiz_data_view),
    path('<pk>/save/', save_quiz_view),
    path('search/', search_view, name='search'),
    path('profile/', profile_view, name='profile')
]