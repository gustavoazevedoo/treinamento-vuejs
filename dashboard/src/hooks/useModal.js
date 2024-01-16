import bus from "../utils/bus";

const EVENT_NAME = "modal:toggle";

export default function useModal() {
  // abre o modal
  function open(payload = {}) {
    bus.emit(EVENT_NAME, { ...payload, status: true });
  }

  // fecha o modal
  function close(payload = {}) {
    bus.emit(EVENT_NAME, { ...payload, status: false });
  }

  // escuta o evento e executa a função
  function listen(fn) {
    bus.on(EVENT_NAME, fn);
  }

  // para de escutar o evento
  function off(fn) {
    bus.on(EVENT_NAME, fn);
  }

  return {
    open, close, listen, off,
  };
}
