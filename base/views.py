from django.shortcuts import render
from django.views.generic import View, TemplateView, ListView
from quizes.models import Quiz
from django.http import JsonResponse

# Create your views here.


class MainPage(ListView):
    template_name = 'user_quizes_list.html'
    model = Quiz
    context_object_name = 'user_quizes'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.user.is_authenticated:
            context['all_quizes'] = context['user_quizes'].exclude(author=self.request.user)
            context['user_quizes'] = context['user_quizes'].filter(author=self.request.user)
        else:
            context['all_quizes'] = context['user_quizes']
            context.pop('user_quizes', None)
        return context


def quiz_view(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    return render(request, 'quiz_view.html', {'obj': quiz})

def quiz_data_view(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    questions = []
    for q in quiz.get_questions():
        answers = []
        for a in q.get_answers():
            answers.append(a.text)
        questions.append({
            "title": str(q),
            "answers": answers
        })
    return JsonResponse({
        'title': quiz.name,
        'topic': quiz.topic,
        'data': questions,
        'time': quiz.time,
    })