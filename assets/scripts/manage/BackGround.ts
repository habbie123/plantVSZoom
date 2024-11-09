import { _decorator, Component, EventMouse, Node } from 'cc';
import { MouseManage } from './MouseManage';
const { ccclass, property } = _decorator;

@ccclass('BackGround')
export class BackGround extends Component {
    protected onLoad(): void {
        this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        
    }
    public onMouseMove(event: EventMouse) {
        MouseManage.Instance.onMouseMove(event);
    }
    update(deltaTime: number) {
        
    }
}


