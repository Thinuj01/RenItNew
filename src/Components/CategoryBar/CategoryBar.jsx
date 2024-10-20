import React from 'react';
import CategoryBarData from './CategoryBar.json';
import NoneScroller from '../NoneScroller/NoneScroller';
import CatOrPackCard from '../CatOrPackCard/CatOrPackCard';

const CategoryBar = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="category-bar">
            <NoneScroller
                title="Category"
                description="Choose your category and rent what you need from our site!"
                className="nonScrollerWrapperFourColumn"
            >
                {
                    CategoryBarData.map((item, index) => (
                        <div key={index}>
                            <CatOrPackCard
                                imageSrc={item.icon}
                                imageAlt={item.imgAlt}
                                title={item.title}
                                url={item.url}
                                category={item.category}
                            />
                        </div>
                    ))
                }
            </NoneScroller>
        </div>
    );
})

export default CategoryBar;
