-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(127),
    "api_count" INTEGER,
    "is_email_verified" BOOLEAN DEFAULT false,
    "first_name" VARCHAR(127),
    "last_name" VARCHAR(127),
    "phone_number" VARCHAR(15),
    "practice_address" JSONB,
    "password" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
