let eventBus = new Vue()

let app = new Vue({
    el: '#app',
    data: {
        newTitle: '',
        newDescription: '',
        newDeadline: '',

        editCard: null,
        editTitle: '',
        editDescription: '',
        editDeadLine: '',

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
            this.saveToLocalStorage()
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
        },

        moveCard(cardId, targetColumn) {
            const card = this.cards.find(card => card.id === cardId)

            if(card) {
                if (card.column === 3 && targetColumn === 2) {
                    const reason = prompt('Пожалуйста укажите причину возврата задачи из тестирования в работу')
                    if (reason === null ) {
                         alert('Возврат отменен. Нужно указать причину.')
                        return
                    }
                    card.returnReason = reason
                }

                if (targetColumn === 4 ) {
                    this.checkDeadline(card)
                }

                card.column = targetColumn
                this.saveToLocalStorage()
            }
        },

        checkDeadline(card) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const deadline = new Date(card.deadline)
            today.setHours(0, 0, 0, 0)

            if (today > deadline) {
                card.status = 'overdue'
                card.statusDeadline = 'Просрочено'
            } else {
                card.status = 'ontime'
                card.statusDeadline = 'Выполнена в срок'

            }

            card.completedAt = new Date().toLocaleString()
        }
        
    },

    
})