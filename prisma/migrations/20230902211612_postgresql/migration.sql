-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "goal" DOUBLE PRECISION NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "devise" TEXT NOT NULL,
    "pictureURl" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
