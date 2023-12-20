export class MockIntersectionObserver {
  constructor(callback, options) {}

  observe(target) {}

  unobserve() {}

  disconnect() {}
}

export class MockIntersectionObserverIntersecting {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.target = null;

    // Trigger intersecting state immediately upon creation
    this.triggerIntersectingState();
  }

  observe(target) {
    this.target = target;
    this.triggerIntersectingState();
  }

  unobserve() {
    this.target = null;
  }

  disconnect() {
    // Implement disconnect logic if needed
  }

  triggerIntersectingState() {
    // Simulate the event of intersection change by calling the callback
    if (this.target) {
      this.callback([
        {
          target: this.target,
          isIntersecting: true,
          intersectionRatio: 1.0,
        },
      ]);
    }
  }
}
