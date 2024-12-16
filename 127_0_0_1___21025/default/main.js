const spawner = require('./spawner')
const creepLogic = require('./creepLogic')

module.exports.loop = function() {

    spawner.run(Game.spawns['Spawn1'])
    

    for (let name in Game.creeps) {
        let creep = Game.creeps[name]
        creepLogic.run(creep)
        if(creep.memory.role == 'harvester') {
            let sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#fff'}})
            }
        }
    }
}
