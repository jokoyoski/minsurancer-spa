
import * as  RiIcons from 'react-icons/ri';
import React from 'react';



export const SideBarData = [

    {
        title: 'DashBoard',
        path: '/main/dashboard',
        icon: <i className="fas fa-columns"></i>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        role:'System Admin',
        id: 3,
        subNav: [

            {
                title: 'Product Category',
                path: '/main/product-category',
                icon: <i className="fas fa-cubes"></i>,
            },
            {
                title: 'Location Managment',
                path: '/main/locations',
                icon: <i className="fas fa-map-marker-alt"></i>,
            },
            {
                title: 'Orders',
                path: '/main/order',
                icon: <i className="fas fa-cart-plus"></i>,
            },
            {
                title: 'Bookings',
                path: '/main/bookings',
                icon: <i className="fas fa-users"></i>,
            },
          


        ]
    },

    {
        title: 'Business',
        path: '/main/',
        icon: <i className="fas fa-box-open"></i>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        role:'System Admin',
        id: 30,
        subNav: [

            {
                title: 'Services',
                path: '/main/services',
                icon: <i className="fas fa-taxi"></i>,
            },
            {
                title: 'Subscriptions',
                path: '/main/subscriptions',
                icon: <i className="fas fa-business-time"></i>,
            }





        ]
    },


    



]