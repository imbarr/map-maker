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
  { from: '1.1', to: '1.2', migration: second }
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
  f.map.pages = f.map.pages.map(p => {
    p.floors = [{id: uuid(), name: 'Floor 1', image: p.image}]
    delete p.image
    return p
  })

  f.map.markers = f.map.markers.map(m => {
    let page = f.map.pages.find(p => p.id === m.page)
    m.floor = page.floors[0].id
    return m
  })
}
