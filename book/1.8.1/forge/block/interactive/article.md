Создать свой блок так же просто, как и предмет. Создадим класс BlocksRegister и в нём пропишем методы `register()`, `registerBlock()` и `registerRender()`.

```java
// BlockRegister.java

public class BlocksRegister 
{
   public static final Block PYRAMID = new BlockPyramid(Material.ANVIL, "pyramid");

   public static void register()
   {
       registerBlock(PYRAMID);
   }

   private static void registerBlock(final Block block)
   {
       //Начиная с 1.9 регистрация блоков стала другой, теперь нужно дважды регистрировать блок, первый раз как предмет, а второй как блок
       GameRegistry.register(block);
       GameRegistry.register(new ItemBlock(block).setRegistryName(block.getRegistryName()));
   }

   @SideOnly(Side.CLIENT)
   public static void registerRender()
   {
        Minecraft.getMinecraft().getRenderItem().getItemModelMesher().register(Item.getItemFromBlock(PYRAMID), 0, new ModelResourceLocation(PYRAMID.getRegistryName(), "inventory"));
   }
}
```

Теперь создадим класс для нашего блока, допустим BlockPyramid.

```java
// BlockPyramid.java

public class BlockPyramid extends Block
{
   /**
    * В этой переменной хранятся координаты ограничительной рамки.
    */
   protected static final AxisAlignedBB PYRAMID = new AxisAlignedBB(0.125D, 0.0D, 0.125D, 0.875D, 0.576D, 0.875D);

   public BlockPyramid(final Material materialIn, final String name)
   {
       //Это материал, его мы будет прописывать при регистрации
       super(materialIn);
       setRegistryName(name);
       setUnlocalizedName(name);
       //Это звук который будет срабатывать, когда блок был поставлен
       setSoundType(SoundType.ANVIL);
       //Это прочность нашего блока.
       setHardness(2.0F);
       //Это свечение нашего блока
       setLightLevel(1.0F);
       setCreativeTab(TabsHandler.TAB_BLOCKS);
   }

   /*
   * Данный метод отвечает за BoundigBox, т.е. это некая "ограничительная рамка", эта рамка позволяет нам
   * взаимодействовать каким угодно образом с блоком.
   */
   @Override
   public AxisAlignedBB getBoundingBox(final IBlockState state, final IBlockAccess source, final BlockPos pos)
   {
       return PYRAMID;
   }

   /*
   * Прозрачность нашего блока, если true то блок будет пропускать сквозь себя свет.
   */
   @Override
   public boolean isOpaqueCube(final IBlockState state)
   {
       return false;
   }

   /*
   * Тип рендера блока, так как мы с вами обладатели 1.8+ версии mc, мы можем использовать json модели
   * для нашего блока, чтобы всё было хорошо укажим рендер блока как модель.
   */
   @Override
   public EnumBlockRenderType getRenderType(final IBlockState state)
   {
       return EnumBlockRenderType.MODEL;
   }

   /*
   * Полный блок, данный метод отвечает за то, где будет заканчиваться блок. Если стоит true то блок будет
   * заполнен полностью и вы не сможете залезть на эту модель. Смотрите скриншоты сравнения ниже!
   */
   @Override
   public boolean isFullCube(final IBlockState state)
   {
       return true;
   }

   /*
   * Чтобы наш блок-модель не давал эффект XRAY, я советую создавать данный метод всегда. В если же у вас обычный
   * блок(не модель), то данный метод можно не прописывать.
   * */
   @Override
   public boolean canPlaceBlockAt(final World worldIn, final BlockPos pos)
   {
       return super.canPlaceBlockAt(worldIn, pos) && worldIn.getBlockState(pos.down()).isFullyOpaque();
   }
}
```

А теперь перейдём в класс ServerProxy и добавим в метод preInit такой код:

```java
// ServerProxy.java

BlocksRegister.register();
```

Далее перейдём в класс ClientProxy и добавим в метод init вот такой код:

```java
// ClientProxy.java

BlocksRegister.registerRender();
```

Теперь можем зайти в mc и радоваться нашей модели! Чтобы запустить mc введём в консоли gradlew runClient
Зайдя в игру мы можем получить наш блок прописав команду /give @p modexample:pyramid и тут то мы видим, что наш блок это чёрно-розовый квадрат, чтобы исправить это мы создадим файл pyramid в папках:

- `src/main/resources/assets/modexample/models/item` - здесь будет модель нашего блока в виде предмета
- `src/main/resources/assets/modexample/models/block` - здесь будет модель нашего блока
- `src/main/resources/assets/modexample/blockstates` - здесь хранятся "статы" блока, т.е. с помощью файлов в этой папке мы сможешь изменять блок в зависимости от разных ситуаций. Примеры будут в дополнительных уроках.

Вот, что в конечном итоге у нас получится:

![Наш результат!](images/result.png)