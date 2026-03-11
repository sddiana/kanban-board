let eventBus = new Vue()

let app = new Vue({
    el: '#app',
    data: {
        newTitle: '',
        newDescription: '',
        newDeadline: '',

        cards: [] 
    },

    created () {
        this.loadFromLocalStorage()
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
                description: this.newDescription,
                createdAt: new Date().toLocaleDateString(),
                deadline: this.newDeadline,
                column: 1
            }

            this.cards.push(newCard)
            this.saveToLocalStorage()

            this.newTitle = ''
            this.newDescription = ''
            this.newDeadline = ''
        },


        saveToLocalStorage () {
            localStorage.setItem('cards', JSON.stringify(this.cards))
        },

        loadFromLocalStorage () {
            const savedCards = localStorage.getItem('cards')
            if (savedCards) {
                try {
                    this.cards = JSON.parse(savedCards)
                } catch {
                    this.cards = []
                }
            }
        },

        deleteCard(cardId) {
            this.cards = this.cards.filter(card => card.id !== cardId)
            this.saveToLocalStorage()
        }
        
    },

    
})