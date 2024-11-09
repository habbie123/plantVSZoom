import { _decorator, Component, EventMouse, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SunController')
export class SunController extends Component {
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    sunClick(event: EventMouse){
        console.log('sunClick');
    }
}


