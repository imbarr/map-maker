import { FileData, FileFloor } from './file-data'
import { version } from './version'
// @ts-ignore
import { v4 as uuid } from 'uuid';

class Migration {
  from: string
  to: string
  migration: (f: FileData) => void
}

const migrations: Migration[] = [
  { from: '1.0', to: '1.1', migration: first },
  { from: '1.1', to: '1.2', migration: second },
  { from: '1.2', to: '1.3', migration: third }
]

export function migrate(f: FileData) {
  if (f.version === version) {
    return
  }

  while (true) {
    let migration = migrations.find(m => m.from === f.version)
    if (!migration) {
      throw new Error('Cannot find migration')
    }
    migration.migration(f)
    f.version = migration.to

    if (f.version === version) {
      return
    }
  }
}

function first(f: any) {
  f.map.markers = f.map.markers.map(m => {
    let lines = m.text.split('\n')
    m.text = lines[0]
    m.desc = lines.slice(1).filter(l => l.length > 0).join('\n')
    return m
  })
}

function second(f: any) {
  f.map.floors = []

  f.map.pages.forEach(p => {
    let floor = {id: uuid(), page: p.id, name: 'Floor 1', image: p.image}
    f.map.floors.push(floor)
  })

  f.map.markers = f.map.markers.map(m => {
    let floor = f.map.floors.find(p => p.page === m.page)
    m.floor = floor.id
    return m
  })
}

function third(f: any) {
  f.map.jumps = []
}
