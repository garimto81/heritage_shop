-- VIP 초대 코드 시스템 마이그레이션
-- UUID 기반 invite_token → 7자리 영숫자 invite_code로 변경
-- 코드 형식: VIP + 4자리 영숫자 (예: VIP7K3M)

-- 1. 새 invite_code 컬럼 추가 (nullable로 시작)
ALTER TABLE vips ADD COLUMN invite_code VARCHAR(8);

-- 2. 기존 VIP에 새 코드 생성
-- 임시 함수: 혼동 방지 문자셋으로 코드 생성
CREATE OR REPLACE FUNCTION generate_vip_invite_code()
RETURNS VARCHAR(8) AS $$
DECLARE
  charset TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code VARCHAR(8);
  random_part VARCHAR(4);
  exists_check BOOLEAN;
BEGIN
  LOOP
    -- 4자리 랜덤 문자열 생성
    random_part := '';
    FOR i IN 1..4 LOOP
      random_part := random_part || substr(charset, floor(random() * length(charset) + 1)::int, 1);
    END LOOP;

    code := 'VIP' || random_part;

    -- 중복 체크
    SELECT EXISTS(SELECT 1 FROM vips WHERE invite_code = code) INTO exists_check;
    IF NOT exists_check THEN
      RETURN code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 3. 기존 레코드에 코드 할당
UPDATE vips
SET invite_code = generate_vip_invite_code()
WHERE invite_code IS NULL;

-- 4. NOT NULL 제약 추가
ALTER TABLE vips
ALTER COLUMN invite_code SET NOT NULL;

-- 5. UNIQUE 제약 및 인덱스 추가
ALTER TABLE vips
ADD CONSTRAINT vips_invite_code_unique UNIQUE (invite_code);

CREATE INDEX idx_vips_invite_code ON vips(invite_code);

-- 6. 임시 함수 제거
DROP FUNCTION generate_vip_invite_code();

-- 7. 기존 invite_token 컬럼은 안정화 후 제거 예정
-- 현재는 유지 (롤백 가능성)
-- ALTER TABLE vips DROP COLUMN invite_token;

COMMENT ON COLUMN vips.invite_code IS '7자리 초대 코드 (VIP + 4자리 영숫자, 예: VIP7K3M)';
