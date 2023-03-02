-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "codigo_categoria" VARCHAR(100) NOT NULL,
    "nombre_categoria" VARCHAR(100) NOT NULL,
    "fecha_creacion" TEXT NOT NULL,
    "estado_categoria" BOOLEAN NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "codigo_producto" VARCHAR(10) NOT NULL,
    "nombre_producto" VARCHAR(100) NOT NULL,
    "descripcion_producto" VARCHAR(800) NOT NULL,
    "precio_producto" DOUBLE PRECISION,
    "stock_producto" INTEGER NOT NULL,
    "imagen" VARCHAR(500) NOT NULL,
    "fecha_creacion" TEXT NOT NULL,
    "tiene_igv" BOOLEAN NOT NULL,
    "sku" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "grupo_id" INTEGER NOT NULL,
    "marca_id" INTEGER NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos" (
    "id" SERIAL NOT NULL,
    "codigo_grupo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "grupos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marca" (
    "id" SERIAL NOT NULL,
    "codigo_grupo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "apellido_paterno" TEXT NOT NULL,
    "apellido_materno" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "tipo_documento" VARCHAR(10) NOT NULL,
    "nro_documento" VARCHAR(20) NOT NULL,
    "telefono" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "fecha_creacion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "perfil_id" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil" (
    "id" SERIAL NOT NULL,
    "codigo_perfil" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "productos_sku_key" ON "productos"("sku");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_grupo_id_fkey" FOREIGN KEY ("grupo_id") REFERENCES "grupos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
