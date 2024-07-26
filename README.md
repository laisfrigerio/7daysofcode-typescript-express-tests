# 7 Days of Code - Tests

Esse projeto foi idealizado por mim para o desafio de 7 dias de código, em parceria com a Alura - uma empresa de educação em tecnologia.

O projeto é uma API para gerenciamento de quizzes. Além disso, esse projeto faz uma integração com a Open Trivia Database para obter quizzes. O projeto foi desenvolvido com as tecnologias `TypeScript` e `Express`.

O desafio dos alunos é a construção de testes automatizados, desde de testes unitários, até testes de integração e end-to-end, usando as tecnologias `Jest` + `Supertest`.

Nesse repositório contém o código final que eu desenvolvi, separado por "branches", onde cada branch contém o código do respectivo dia.

Não há código certo ou errado, pois cada desenvolvedor possui sua própria maneira de escrever sua solução. Portanto, fique a vontade para criar do seu jeito e não se preocupe caso a sua solução seja diferente da minha.

Eu desafio você a ir além do desafio proposto. Estimule sua criativade:

- Construa a API usando o framework NestJS e desenvolva os testes automatizados
- Estuda sobre testes automatizados usando o Node nativo (a partir do node 18)
- Adicione novas funcionalidades ao quiz, como salvar respostas, ranqueamento
- E muuuuuuito mais;

O objetivo é praticar. Portanto, coloque em prática tudo o que você já aprendeu e adiquira novas conhecimentos!!!

Até a próxima!

---

PARA ALURA!!!!

## Day 01

- Introdução aos testes automatizados e testes de unidade
- Escrevendo testes de unidade para as funções de adapter e repository (são funções de lógica)
- Uso do Assert toBe() e toStrictEqual() do Jest

## Day 02

- Introdução aos testes de integração
- Escrevendo testes de integração para as funções do arquivo `quiz.service.ts` (service chama as funções de repository e faz alguns tratamentos)
- Uso do Assert toBe(), toStrictEqual() e toThrown() do Jest (service lança exception, por exemplo)

## Day 03

- Introdução ao conceito de Mocks e Spies
- Aprendendo a mockar a função `fetchQuestions` da integração com o trivia
- Aprendendo a mockar a função de uma biblioteca, como axios.get (aqui ao invés de mocar a função `fetchQuestions`, o aluno será desafiado a fazer o mock da biblioteca axios)
- Verificando toHaveBeenCalled(), toHaveBeenCalledWith e toHaveBeenCalledTimes do jest (aqui também é uma oportunidade de usar esses assertions)

## Day 04

- Introdução aos testes E2E
- Escrevendo os primeiros testes de requisições HTTP GET (get all quizzes, get a quiz by id, get quizzes by category) - usando o `supertest`
- Requisições POST (Faça mock da função fetchQuestions ao chamar o Trivia)
- Requsição PATCH para alterar uma question
- Requisição DELETE para remover um quiz

## Day 05

- Introdução ao uso de testes generativos
- Instalando a biblioteca `fast-check`
- Escrevendo testes usando o gerador da biblioteca `fast-check`

## Day 06

- Introdução a cobertura de código
- Configuirando o jest para medir a cobertura de código
- Aprender a interpretar relatórios de cobertura de código para identificar partes do código não cobertas por testes.
- Incentivar a cobertura de testes em áreas críticas do código que ainda não foram testadas.

## Day 07

- Introdução ao Github Actions
- Automatizando o processo de execução dos testes ao abrir um Pull Request
