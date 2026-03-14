Vue.component('card-component', {
    props: {
        card: Object,
        isEditing: Boolean,
        editTitle: String,
        editDescription: String,
        editDeadline: String,
        columnNumber: Number
    },
    template: `
        <div class="card">
            <div v-if="isEditing" class="edit-mode">
                <input type="text" :value="editTitle" @input="$emit('update:editTitle', $event.target.value)">
                <textarea :value="editDescription" @input="$emit('update:editDescription', $event.target.value)"></textarea>
                <input type="date" :value="editDeadline" @input="$emit('update:editDeadline', $event.target.value)">
                <div class="edit-buttons">
                    <button class="button-small" @click="$emit('save-edit', card)">Сохранить</button>
                    <button class="button-small" @click="$emit('cancel-edit')">Отмена</button>
                </div>
            </div>

            <div v-else-if="columnNumber === 1" class="card-inline view-mode">
                <h3 class="title-card">{{ card.title }}</h3>
                <p class="description">{{ card.description }}</p>
                <span class="start-date">{{ card.createdAt }}</span>
                <span class="deadline">{{ card.deadline }}</span>
                <div class="buttons">
                    <button class="button-small" @click="$emit('start-edit', card)">Редактировать</button>
                    <button class="button-small delete-button" @click="$emit('delete-card', card.id)">Удалить</button>
                    <button class="button-small" @click="$emit('move-card', { cardId: card.id, targetColumn: 2 })">В работу</button>
                </div>
            </div>

            <div v-else-if="columnNumber === 2" class="card-inline view-mode">
                <h3 class="title-card">{{ card.title }}</h3>
                <p class="description">{{ card.description }}</p>
                <span class="start-date">{{ card.createdAt }}</span>
                <span class="deadline">{{ card.deadline }}</span>
                <div class="buttons">
                    <button class="button-small" @click="$emit('start-edit', card)">Редактировать</button>
                    <button class="button-small delete-button" @click="$emit('delete-card', card.id)">Удалить</button>
                    <button class="button-small" @click="$emit('move-card', { cardId: card.id, targetColumn: 3 })">В тестирование</button>
                </div>
                <div v-if="card.returnReason" class="return-reason">
                    <small>Причина возврата в работу: {{ card.returnReason }}</small>
                </div>
            </div>

            <div v-else-if="columnNumber === 3" class="card-inline view-mode">
                <h3 class="title-card">{{ card.title }}</h3>
                <p class="description">{{ card.description }}</p>
                <span class="start-date">{{ card.createdAt }}</span>
                <span class="deadline">{{ card.deadline }}</span>
                <div class="buttons">
                    <button class="button-small" @click="$emit('delete-card', card.id)">Удалить</button>
                    <button class="button-small" @click="$emit('move-card', { cardId: card.id, targetColumn: 4 })">Выполнить</button>
                    <button class="button-small" @click="$emit('move-card', { cardId: card.id, targetColumn: 2 })">Вернуть в работу</button>
                </div>
                <div v-if="card.returnReason" class="return-reason">
                    <small>Причина возврата в работу: {{ card.returnReason }}</small>
                </div>
            </div>

            <div v-else-if="columnNumber === 4" class="card-inline view-mode">
                <h3 class="title-card">{{ card.title }}</h3>
                <p class="description">{{ card.description }}</p>
                <span class="start-date">{{ card.createdAt }}</span>
                <span class="deadline">{{ card.deadline }}</span>
                <span :class="{'overdue': card.status === 'overdue', 'ontime': card.status === 'ontime'}">{{ card.statusDeadline }}: <small>{{ card.completedAt }}</small></span>
                <div class="buttons">
                    <button class="button-small delete-button" @click="$emit('delete-card', card.id)">Удалить</button>
                </div>
                <div v-if="card.returnReason" class="return-reason">
                    <small>Причина возврата в работу: {{ card.returnReason }}</small>
                </div>
            </div>
        </div>
    `
})

Vue.component('column-component', {
    props: {
        columnNumber: Number,
        columnName: String,
        cards: Array,
        editCard: [Number, null],
        editTitle: String,
        editDescription: String,
        editDeadline: String,
        newTitle: String,
        newDescription: String,
        newDeadline: String
    },
    template: `
        <div class="column">
            <div v-if="columnNumber === 1" class="form-container">
                <h3>Создать новую задачу</h3>
                <div class="form-group">
                    <label>Заголовок:</label>
                    <input type="text" :value="newTitle" @input="$emit('update:newTitle', $event.target.value)">
                </div>
                <div class="form-group">
                    <label>Описание:</label>
                    <textarea :value="newDescription" @input="$emit('update:newDescription', $event.target.value)" rows="1"></textarea>
                </div>
                <div class="form-group">
                    <label>Дедлайн:</label>
                    <input type="date" :value="newDeadline" @input="$emit('update:newDeadline', $event.target.value)">
                </div>
                <button type="submit" class="button-create" @click="$emit('create-card')">Создать</button>
            </div>

            <div class="column-header">
                <h3 class="column-name">{{ columnName }}</h3>
            </div>

            <card-component
                v-for="card in cards"
                :key="card.id"
                :card="card"
                :isEditing="editCard === card.id"
                :editTitle="editTitle"
                :editDescription="editDescription"
                :editDeadline="editDeadline"
                :columnNumber="columnNumber"
                @start-edit="$emit('start-edit', $event)"
                @save-edit="$emit('save-edit', $event)"
                @cancel-edit="$emit('cancel-edit')"
                @delete-card="$emit('delete-card', $event)"
                @move-card="$emit('move-card', $event)"
                @update:editTitle="$emit('update:editTitle', $event)"
                @update:editDescription="$emit('update:editDescription', $event)"
                @update:editDeadline="$emit('update:editDeadline', $event)"
            />
        </div>
    `
})

Vue.component('board-component', {
    props: {
        cards: Array,
        editCard: [Number, null],
        editTitle: String,
        editDescription: String,
        editDeadline: String,
        newTitle: String,
        newDescription: String,
        newDeadline: String
    },
    data() {
        return {
            columns: [
                { number: 1, name: 'Запланированные задачи' },
                { number: 2, name: 'Задачи в работе' },
                { number: 3, name: 'Тестирование' },
                { number: 4, name: 'Выполненные задачи' }
            ]
        }
    },
    methods: {
        getColumnCards(columnNumber) {
            return this.cards.filter(card => card.column === columnNumber)
        }
    },
    template: `
        <div class="columns-container">
            <column-component
                v-for="column in columns"
                :key="column.number"
                :columnNumber="column.number"
                :columnName="column.name"
                :cards="getColumnCards(column.number)"
                :editCard="editCard"
                :editTitle="editTitle"
                :editDescription="editDescription"
                :editDeadline="editDeadline"
                :newTitle="newTitle"
                :newDescription="newDescription"
                :newDeadline="newDeadline"
                @update:newTitle="$emit('update:newTitle', $event)"
                @update:newDescription="$emit('update:newDescription', $event)"
                @update:newDeadline="$emit('update:newDeadline', $event)"
                @create-card="$emit('create-card')"
                @start-edit="$emit('start-edit', $event)"
                @save-edit="$emit('save-edit', $event)"
                @cancel-edit="$emit('cancel-edit')"
                @delete-card="$emit('delete-card', $event)"
                @move-card="$emit('move-card', $event)"
                @update:editTitle="$emit('update:editTitle', $event)"
                @update:editDescription="$emit('update:editDescription', $event)"
                @update:editDeadline="$emit('update:editDeadline', $event)"
            />
        </div>
    `
})

let app = new Vue({
    el: '#app',
    data: {
        newTitle: '',
        newDescription: '',
        newDeadline: '',

        editCard: null,
        editTitle: '',
        editDescription: '',
        editDeadline: '',

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

        moveCard(payload) {
            const card = this.cards.find(card => card.id === payload.cardId)

            if(card) {
                if (card.column === 3 && payload.targetColumn === 2) {
                    const reason = prompt('Пожалуйста укажите причину возврата задачи из тестирования в работу')
                    if (reason === null || reason === '' ) {
                         alert('Возврат отменен. Нужно указать причину.')
                        return
                    }
                    card.returnReason = reason
                }

                if (payload.targetColumn === 4 ) {
                    this.checkDeadline(card)
                }

                card.column = payload.targetColumn
                this.saveToLocalStorage()
            }
        },

        checkDeadline(card) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const deadline = new Date(card.deadline)

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

    template: `
        <div>
            <board-component
                :cards="cards"
                :editCard="editCard"
                :editTitle="editTitle"
                :editDescription="editDescription"
                :editDeadline="editDeadline"
                :newTitle="newTitle"
                :newDescription="newDescription"
                :newDeadline="newDeadline"
                @update:newTitle="newTitle = $event"
                @update:newDescription="newDescription = $event"
                @update:newDeadline="newDeadline = $event"
                @create-card="createCard"
                @start-edit="startEdit"
                @save-edit="saveEdit"
                @cancel-edit="cancelEdit"
                @delete-card="deleteCard"
                @move-card="moveCard"
                @update:editTitle="editTitle = $event"
                @update:editDescription="editDescription = $event"
                @update:editDeadline="editDeadline = $event"
            />
        </div>
    `
})
