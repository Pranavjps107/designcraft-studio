import * as RP from 'react-resizable-panels';
console.log('Keys:', Object.keys(RP));
try {
    const RP2 = await import('react-resizable-panels');
    console.log('Dynamic Import Keys:', Object.keys(RP2));
} catch (e) {
    console.error(e);
}
