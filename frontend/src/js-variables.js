const axios_url_local = 'http://localhost:3000';
const axios_url_herokuapp = 'https://orbi-habits-api.herokuapp.com';

const axios_url = axios_url_herokuapp;

const recommended_goals = {
  no_sugar: {
    title: 'День без сладкого',
    description: 'Быстрые углеводы не приносят пользы, но способствуют увеличению веса.',
    'period': 30,
  },
  no_smoking: {
    title: 'День без курения',
    description: 'Курение негавтивно влияет на легкие и сердечно сосудистую систему',
    'period': 30,
  },
}

export {axios_url, recommended_goals};