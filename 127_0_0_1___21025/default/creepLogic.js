const creepLogic = {
    run:function(creep) {
        if(creep.memory.role == 'carrier'){
            let droppedEnergy = _.filter(creep.room.find(FIND_DROPPED_RESOURCES))
            if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(droppedEnergy[0])
            }
        }

        if(creep.memory.role == 'harvester'){
            
        }
    }
}

module.exports = creepLogic