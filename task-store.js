export class TaskStore {
  constructor({ deals = [], tasks = [] } = {}) {
    this.deals = new Map(deals.map(deal => [deal.id, { ...deal }]))
    this.tasks = new Map(tasks.map(task => [task.id, { ...task }]))
  }

  requireDeal(session, dealId) {
    const deal = this.deals.get(dealId)
    if (!deal || deal.tenantId !== session.tenantId || !session.carrierIds.includes(deal.carrierId)) {
      throw new Error('Deal not found')
    }
    return deal
  }

  createTask(session, { id, dealId, title }) {
    if (this.tasks.has(id)) throw new Error('Task already exists')
    const deal = this.requireDeal(session, dealId)
    const task = {
      id, dealId, title, tenantId: deal.tenantId, carrierId: deal.carrierId,
      ownerId: deal.ownerId, status: 'open',
    }
    this.tasks.set(id, task)
    return { ...task }
  }

  assignmentsFor(ownerId) {
    return [...this.tasks.values()].filter(task => task.ownerId === ownerId && task.status === 'open')
  }
}
