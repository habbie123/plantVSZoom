import { _decorator, Component, Node } from 'cc';
import { Plant } from '../manage/Plant';
import { sunFlower } from '../component/extend/sunFlower';
const { ccclass, property } = _decorator;


/**
 * 卡片状态
 */
export enum CardStats{
    Cooling,//冷却中
    WaitingSun,//等待太阳
    Ready,//已准备
}
/**
 * 植物状态
 */
export enum PlantStatus{
    disable,
    enable,
}

export enum PlantType{
    Sunflower,
    Peashooter,
}
export class PlantChild {
    constructor(){
        PlantChild.type.set(PlantType.Sunflower,  '/assets/scripts/component/extend/sunFlower.ts');
        PlantChild.type.set(PlantType.Peashooter,  '/assets/scripts/component/extend/Peashooter.ts');
    }
    
    private static type:Map<PlantType, string> = new Map();

    public static take(type:PlantType):string{
        return PlantChild.type.get(type);
    }
}

@ccclass('StatusEnum')
export class StatusEnum extends Component {

    static cardStatus:CardStats = CardStats.Cooling;

    static plantStatus:PlantStatus = PlantStatus.disable;
}




