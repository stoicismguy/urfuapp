from django.shortcuts import render
from django.views.generic import View, TemplateView, ListView
from quizes.models import Quiz
from questions.models import Question, Answer
from django.http import JsonResponse
import json

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
        'length': len(questions),
        'time': quiz.time,
    })


def save_quiz_view(request, pk):
    data = dict(request.POST)
    callback = dict()
    callback['result'] = 0
    callback['length'] = int(data['length'][0])
    data.pop('length')
    data.pop('csrfmiddlewaretoken')

    for k in data.keys():
        question = Question.objects.get(text=k)
        answer = question.get_correct_answer()[0]
        if data[k][0] == answer.text:
            callback['result'] += 1
    callback['percentage'] = int((callback['result'] / callback['length']) * 100)
    callback['user'] = str(request.user)

    return JsonResponse(callback)


def create_quiz_view(request):
    return render(request, 'create_quiz_view.html')


def save_create_view(request):
    data = dict(request.POST)
    all_questions = json.loads(data['questions'][0])
    # dict_keys(['csrfmiddlewaretoken', 'title', 'topic', 'difficulty', 'time', 'questions'])

    username = request.user
    print(len(all_questions))
    print(request.user)
    db_quiz = Quiz.objects.create(
        author=username,
        name=data['title'][0],
        topic=data['topic'][0],
        number_of_questions=len(all_questions),
        time=int(data['time'][0]),
        difficulty=data['difficulty'][0])
    quiz_id = db_quiz.id

    for q in all_questions:
        all_answers = q['answers']
        db_question = Question.objects.create(
            text=q['name'],
            quiz=db_quiz
        )
        for ans in all_answers:
            db_answer = Answer.objects.create(
                text=ans['text'],
                correct=bool(ans['is_correct']),
                question=db_question
            )

    return JsonResponse({'is': 'yes'})
