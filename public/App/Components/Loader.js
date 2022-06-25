export default class Loader {
    constructor(ele) {
        this.element = ele;
        this.data = null;
        this.loader = `<div class="loader">
                            <div class='ball'></div>
                        </div>`;  
    }
    load() {
        this.data = this.element.innerHTML;
        this.element.innerHTML = this.loader;
    }
    stopLoad() {
        this.element.innerHTML = this.data;
    }
}