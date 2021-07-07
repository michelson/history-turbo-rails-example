import { Controller } from 'stimulus';
import { useMutation } from 'stimulus-use';
import { navigator } from '@hotwired/turbo'

/*

export default class extends Controller {
  connect () {
    useMutation(this, { attributes: true })
  }

  mutate (entries) {
    entries.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        const src = this.element.getAttribute('src')
        if (src != null) { navigator.history.push(new URL(src)) }
      }
    })
  }
}*/


export default class extends Controller {
  connect() {
    useMutation(this, { attributes: true });
    this.popStateListener = this.popStateListener.bind(this);
    window.addEventListener('popstate', this.popStateListener);
    // Make Turbo ignore popstate events for the initial state
    window.history.replaceState(this.historyState(), '', window.location.href);
  }

  disconnect() {
    window.removeEventListener('popstate', this.popStateListener);
  }

  mutate(entries) {
    entries.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        const src = this.element.getAttribute('src');
        if (src != null && src !== window.location.href) {
          console.log('HISTORY TRIGGER PUSH ON', src);
          window.history.pushState(this.historyState(), '', src);
        }
      }
    });
  }

  popStateListener(event) {
    if ( event.state.turbo_frame_history){
      if(event.state.turbo_frame === this.element.id){
        this.element.src = window.location.href;
      }else{
        console.log("HISTORY NOT HANDLED FALLBACK REQUEST TO TURBO VISIT")
        //const src = this.element.getAttribute('src')
        //navigator.history.push(new URL(src))
        //window.Turbo.visit(window.location.href)
        //navigator.history.push(window.location.href)
      }
    }
  }

  historyState() {
    return {
      turbo_frame_history: true,
      turbo_frame: this.element.id,
    };
  }
}