Стартовая страница учебника.

# Загловок стартовой страницы

Здесь работают все функции, доступные и в обычных статях!

```html
<nav>
    <div class="inner">
        <section class="book-choose">
            <div class="api-choose">
                <label>API:
                    <select>
                        {{#APIs}}
                            {{{.}}}
                        {{/APIs}}
                    </select>
                </label>
            </div>
        </section>
        <div class="categories">
            {{#categories}}
                {{{.}}}
            {{/categories}}
        </div>
    </div>
</nav>
```

И еще немного текста!

![Изображение на стартовой странице учебника](images/slow-poke.png)