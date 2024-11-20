

const getMenuFrontend = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'ti-world',
            submenu: [
                { title: 'Main', path: '/' },
                { title: 'ProgressBar', path: 'progress' },
                { title: 'Gráficos', path: 'graph1' },
                { title: 'Promesas', path: 'promises' },
                { title: 'RXJS', path: 'rxjs' },
            ],
        },
    
        {
            title: 'Mantenimiento',
            icon: 'ti-panel',
            submenu: [
                { title: 'Hospitales', path: 'hospitals' },
                { title: 'Doctores', path: 'doctors' }
            ],
        },
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', path: 'users' });
    }

    return menu;
}

module.exports = {
    getMenuFrontend,
};