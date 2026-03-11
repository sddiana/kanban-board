let eventBus = new Vue()

let app = new Vue({
    el: '#app',
    data: {
        newTitle: '',
        newDescription: '',
        newDeadline: '',

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
        },

        createCard () {
            if (!this.newTitle || !this.newDescription || !this.newDeadline) {
                return alert('Заполните все поля формы!')
            }

            const newCard = {
                id: Date.now(),
                title: this.newTitle,
                title: this.newTitle,
                description: this.newDescription,
                createdAt: new Date().toLocaleDateString(),
                deadline: this.newDeadline,
                column: 1
            }

            this.cards.push(newCard)

            this.newTitle = ''
            this.newDescription = ''
            this.newDeadline = ''
        }
    }
})