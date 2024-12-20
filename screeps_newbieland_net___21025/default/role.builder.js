var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }

		if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			let targetsToDump = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_TOWER) && 
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
		});
			if(targetsToDump.length > 0) {
				if(creep.transfer(targetsToDump[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetsToDump[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		}

	    else {
			let sources = creep.pos.findClosestByPath(creep.room.find(FIND_DROPPED_RESOURCES));
	        // var sources = creep.room.find(FIND_SOURCES);
            if(creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;