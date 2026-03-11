let eventBus = new Vue()

let app = new Vue({
    el: '#app',
    data: {
        newTitle: '',
        newDescription: '',
        newDeadline: '',

        editCard: null,
        etitTitle: '',
        editeDescription: '',
        etiteDeadLine: '',

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
                createdAt: new Date().toDateString(),
                deadline: this.newDeadline,
                column: 1
            }

            this.cards.push(newCard)
            this.saveToLocalStorage()

            this.newTitle = ''
            this.newDescription = ''
            this.newDeadline = ''
        },

        startEdit(card) {
            this.editCard = card.id
            this.editTitle = card.title
            this.editDescription = card.description
            this.editDeadline = card.deadline
        },

        saveEdit(card) {
            card.title = this.editTitle
            card.description = this.editDescription
            card.deadline = this.editDeadline
            card.lastEdited = new Date().toDateString()

            this.cancelEdit()
            this.saveToLocalStorage
        },

        cancelEdit() {
            this.editCard = null
            this.editTitle = ''
            this.editDescription = ''
            this.editDeadline = ''
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