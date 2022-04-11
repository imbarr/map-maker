import { version } from './version';

class Migration {}

const migrations = [{
  from: '1.0',
  to: '1.1',
  migration: first
}];
export function migrate(f) {
  if (f.version === version) {
    return;
  }

  while (true) {
    let migration = migrations.find(m => m.from);

    if (!migration) {
      throw new Error('Cannot find migration');
    }

    migration.migration(f);
    f.version = migration.to;

    if (f.version === version) {
      return;
    }
  }
}

function first(f) {
  f.map.markers = f.map.markers.map(m => {
    let lines = m.text.split('\n');
    m.text = lines[0];
    m.desc = lines.slice(1).filter(l => l.length > 0).join('\n');
    return m;
  });
}