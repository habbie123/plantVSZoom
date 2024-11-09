import { _decorator, animation, Animation, Component, Enum, Node } from 'cc';
import { PlantStatus, PlantType } from '../glob/StatusEnum';

const { ccclass, property } = _decorator;

@ccclass('Plant')
export class Plant extends Component {

    @property({ type: Enum(PlantType)})
    public plantType:PlantType ;

    plantStatus:PlantStatus = PlantStatus.disable;

    start() {

    }

    protected onLoad(): void {
        // this.plantStatus = PlantStatus.enable;
        // this.node.getComponent(animation.AnimationController).enabled = true;
    }

    // update(deltaTime: number) {
    //     switch (this.plantStatus) {
    //         case PlantStatus.disable:
    //             this.disableUpdate();
    //             break;
    //         case PlantStatus.enable:
    //             this.enableUpdate();
    //             break;
    //     }
    // }

    disableUpdate(){
        this.plantStatus = PlantStatus.disable;
        // this.node.getComponent(Animation).enabled = false;
    }

    enableUpdate(){
        this.plantStatus = PlantStatus.enable;
        // this.node.getComponent(Animation).enabled = true;
    }





}


