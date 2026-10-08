export function createTaskApi(store) {
  return {
    move: (session, taskId, dealId) => store.moveTask(session, taskId, dealId),
    list: session => store.listTasks(session),
    detail: (session, taskId) => store.getTask(session, taskId),
    close: (session, dealId) => store.closeDeal(session, dealId),
  }
}
