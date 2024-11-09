import { _decorator, Component, EventMouse, Node, NodeEventType, Vec3 } from 'cc';
import { MouseManage } from './MouseManage';
import { Plant } from './Plant';
import { sunFlower } from '../component/extend/sunFlower';
import { PlantChild } from '../glob/StatusEnum';
const { ccclass, property } = _decorator;

@ccclass('GroundCell')
export class GroundCell extends Component {

    private currentPlant: Node = null;

    protected onLoad(): void {
        // this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }
    protected onDestroy(): void {
        this.node.off(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        // this.node.off(Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }
    onMouseDown(event: EventMouse) {
        console.log('mouse down......');
        if(MouseManage.Instance.getCurrentPlant() == null)return;
        if(this.currentPlant != null)return;
        this.currentPlant = MouseManage.Instance.getCurrentPlant();
        let mousePos = event.getUILocation();
        let worldPos = new Vec3(mousePos.x, mousePos.y, 0);
        this.currentPlant.setWorldPosition(worldPos);
        // PlantChild.take(this.currentPlant.getComponent(Plant).);
        this.currentPlant.getComponent(Plant).enableUpdate();
        MouseManage.Instance.cleanCurrentPlant();
    }
    onMouseMove(event: EventMouse) {
        MouseManage.Instance.onMouseMove(event);
    }
}


