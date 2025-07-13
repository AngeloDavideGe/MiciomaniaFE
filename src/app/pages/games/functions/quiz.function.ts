import { CasualQuiz, Quiz } from '../interfaces/games.interfaces';
import quiz from '../constants/quiz.constant';

type CasualOrQuiz = CasualQuiz | Quiz;

export function getCasualQuiz(domande: Quiz[] | null = null): CasualOrQuiz {
  const casual: CasualQuiz = getCasual(domande ?? quiz);
  return domande ? casual : casual.quiz;
}

function getCasual(domande: Quiz[]): CasualQuiz {
  const randomIndex: number = Math.floor(Math.random() * domande.length);

  return {
    quiz: domande[randomIndex],
    index: randomIndex,
  };
}
