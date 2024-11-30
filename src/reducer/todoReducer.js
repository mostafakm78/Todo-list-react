

export default function todoReducer(todos , action) {
    switch (action?.type) {
        case 'initial-list':
            return action?.todos
        case 'add':
            return [
                ...todos,
                {
                    id : action?.id,
                    title : action?.title,
                    status : false
                }
            ]
        case 'delete':
            return todos.filter((todoitem) => {
                return action?.id != todoitem.id
            })
        case 'toggle':
            return todos.map((todoitems) => {
                if (action?.id === todoitems.id) {
                    todoitems.status = !todoitems.status
                }

                return todoitems
            })
        case 'edit':
            return todos.map((todoitems) => {
                if (action?.id === todoitems.id) {
                    todoitems.title = action?.newtitle
                }

                return todoitems
            })

        default:
            break;
    }
}
