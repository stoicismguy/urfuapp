from django.shortcuts import render
from django.views.generic import View, TemplateView, ListView
from quizes.models import Quiz

# Create your views here.


class MainPage(ListView):
    template_name = 'user_quizes_list.html'
    model = Quiz
    context_object_name = 'user_quizes'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user_quizes'] = context['user_quizes'].filter(author=self.request.user)
        return context

