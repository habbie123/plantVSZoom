import { _decorator, Component, EventMouse, find, Input, input, instantiate, Node, NodeEventType, Prefab, System, SystemEvent,  Vec3 } from 'cc';
import { PlantType } from '../glob/StatusEnum';
import { Loader } from '../glob/Loader';
import { Plant } from './Plant';
import { sunFlower } from '../component/extend/sunFlower';
const { ccclass, property } = _decorator;



/**
 * 鼠标管理
 */
@ccclass('MouseManage')
export class MouseManage extends Component {


    private currentPlant:Node = null;
    
    private static _instance:MouseManage = null;

    public getCurrentPlant():Node{
        return this.currentPlant;
    }
    public cleanCurrentPlant(){
        this.currentPlant = null;
    }

    static get Instance():MouseManage{
        return this._instance;
    }


    protected onLoad(): void {
        if(MouseManage._instance == null){
            MouseManage._instance = this;
        }else{
            console.log('cant find MouseManage instance');
            this.node.destroy();
        }

        console.log('开始鼠标控制');
        // input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);

        
        // const systemEvent = new SystemEvent();
        // systemEvent.on(SystemEvent.EventType.MOUSE_MOVE, this.onMouseMove, this);
        // this.canvasNode.on(NodeEventType.TOUCH_MOVE, this.onMouseMove, this);
    }
    

    onMouseMove(event: EventMouse) {
        // console.log("鼠标移动", this.currentPlant);
        if(this.currentPlant != null){
            let mousePos = event.getUILocation();
            let worldPos = new Vec3(mousePos.x, mousePos.y, 0);
            this.currentPlant.setWorldPosition(worldPos);
        }
    }

    update(deltaTime: number) {
        
    }
    /**
     * Adds a plant of the specified type to the scene.
     *
     * @param {PlantType} plantType - The type of plant to add.
     */
    addPlant(plantType:PlantType,event: EventMouse){
        
        let prefab = Loader.getPlantPrefab(plantType);
        if(prefab == null){
            console.log('未找到对应的植物', plantType);
            return;
        }
        
        this.currentPlant = instantiate(prefab);
        this.currentPlant.setParent(find('Canvas/Game'));
        this.currentPlant.getComponent(sunFlower).disableUpdate();
        this.onMouseMove(event);
    }

    test(){
        let base64String="";
        const byteArray = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
    }


}


