let spawner = {
    run:function(spawn) {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' );
        // console.log('Harvesters:' + harvesters.length);
        
        if(harvesters.length < 3){
            if(carriers.length > 0){
                if(spawn.spawnCreep([WORK,WORK,MOVE,MOVE], 'Harvester' + Game.time, {dryRun: true}) == 0){
                    let newName = 'Harvester' + Game.time;
                    spawn.spawnCreep([WORK,WORK,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
                }
            else{
                if(spawn.spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], 'Carrier' + Game.time, {dryRun: true}) == 0){
                    let newName = 'Carrier' + Game.time;
                    spawn.spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'carrier'}});
                }
            }}
        }
        
        else if (builders.length < 2 && harvesters.length > 0 && carriers.length > 0) {
            let newName = 'Builder' + Game.time;
            spawn.spawnCreep([WORK,WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
        }
        
        else if (upgraders.length < 2 && harvesters.length > 0 && carriers.length > 0) {
            let newName = 'Upgrader' + Game.time;
            spawn.spawnCreep([WORK,WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
        }
        
        else if (carriers.length < 3) {
            let newName = 'Carrier' + Game.time;
            spawn.spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'carrier'}});
        }
    }
}

module.exports = spawner;