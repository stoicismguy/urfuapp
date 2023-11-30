from django.urls import path
from .views import MainPage, quiz_view, quiz_data_view

urlpatterns = [
    path('', MainPage.as_view()),
    path('<pk>/', quiz_view),
    path('<pk>/data/', quiz_data_view)
]