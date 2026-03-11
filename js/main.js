let eventBus = new Vue()

let app = new Vue({
    el: '#app',
    data: {
        cards: [
            {
                id: 1,
                title: 'Тестовая карточка',
                description: 'Тестовое описание',
                createdAt: '01.02.2026',
                deadline: '01.02.2026',
                column: 1
            },
            {
                id: 2,
                title: 'Тестовая карточка 2',
                description: 'Тестовое описание 2',
                createdAt: '01.02.2026',
                deadline: '01.02.2026',
                column: 2

            }
        ] 
    },

    methods: {
        getColumnNumber(columnNumber) {
            return this.cards.filter(card => card.column === columnNumber)
        }
    }
})